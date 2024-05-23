from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.http import JsonResponse
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from .serializers import (
    UserSerializer,
    PasswordResetRequestSerializer,
    PasswordResetConfirmSerializer,
    NoteSerializer,
)
from .models import Note
from .utils.send_email import send_registration_email, send_reset_password_link

""" USERS """


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get("username", "")
        if User.objects.filter(username=username).exists():
            return JsonResponse(
                {
                    "error": "Username already exists.",
                    "status": 409,
                    "message": "Conflict",
                }
            )

        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            send_registration_email(username)
            return JsonResponse(
                {
                    "success": True,
                    "status": 201,
                    "message": "User created successfully.",
                }
            )
        else:
            return JsonResponse(
                {"error": serializer.errors, "status": 400, "message": "Bad request."}
            )


class PasswordResetRequestView(generics.GenericAPIView):
    serializer_class = PasswordResetRequestSerializer
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data["username"]
            try:
                user = User.objects.get(username=username)
                if not user.username:
                    return JsonResponse({"error": "User don't exists"}, status=400)
                token = default_token_generator.make_token(user)
                uid = urlsafe_base64_encode(force_bytes(user.pk))
                reset_link = (
                    f"http://localhost:5173/new-password?uid={uid}&token={token}"
                )
                print(user.username)
                send_reset_password_link(user.username, reset_link)
                return JsonResponse(
                    {"message": "Password reset email sent."}, status=200
                )
            except User.DoesNotExist:
                return JsonResponse({"error": "Username does not exist."}, status=400)
        return JsonResponse({"error": serializer.errors}, status=400)


class PasswordResetConfirmView(generics.GenericAPIView):
    serializer_class = PasswordResetConfirmSerializer
    permission_classes = [AllowAny]

    def post(self, request):
        uidb64 = request.query_params.get("uid")
        token = request.query_params.get("token")

        if not uidb64 or not token:
            return JsonResponse(
                {
                    "error": "Missing UID or token.",
                    "details": "Ensure both UID and token are provided in the request.",
                },
                status=400,
            )

        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist) as e:
            return JsonResponse(
                {"error": "Invalid link.", "details": str(e)}, status=400
            )

        if default_token_generator.check_token(user, token):
            serializer = self.get_serializer(data=request.data)
            if serializer.is_valid():
                user.set_password(serializer.validated_data["new_password"])
                user.save()
                return JsonResponse({"message": "Password has been reset."}, status=200)
            else:
                return JsonResponse(
                    {"error": "Invalid data.", "details": serializer.errors}, status=400
                )
        else:
            return JsonResponse(
                {
                    "error": "Invalid token.",
                    "details": "Token does not match or has expired.",
                },
                status=400,
            )


""" NOTES """


class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return JsonResponse(
                {
                    "success": True,
                    "status": 201,
                    "message": "Note created successfully.",
                }
            )
        else:
            return JsonResponse(
                {"error": serializer.errors, "status": 400, "message": "Bad request."}
            )


class NoteUpdate(generics.RetrieveUpdateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)

    def update(self, request, **kwargs):
        partial = kwargs.pop("partial", False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(
                {
                    "success": True,
                    "status": 200,
                    "message": "Note updated successfully.",
                }
            )
        else:
            return JsonResponse(
                {"error": serializer.errors, "status": 400, "message": "Bad request."}
            )


class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return JsonResponse(
            {"success": True, "status": 204, "message": "Note deleted successfully."}
        )
