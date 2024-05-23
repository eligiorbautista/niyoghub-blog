from django.core.mail import send_mail
from django.conf import settings


def send_registration_email(username):
    subject = "Welcome to NoteKeeper!"
    message = f"""
Hi {username},

Welcome to NoteKeeper, your ultimate tool for organizing your thoughts, ideas, and tasks! We are thrilled to have you join our community.

With NoteKeeper, you can:

- 𝗖𝗿𝗲𝗮𝘁𝗲: Easily jot down your thoughts and ideas anytime, anywhere.
- 𝗘𝗱𝗶𝘁: Refine and polish your notes to perfection with ease.
- 𝗗𝗲𝗹𝗲𝘁𝗲: Remove unwanted notes effortlessly to keep your workspace organized.

Start exploring NoteKeeper now and unleash your productivity!

Note: This is an automated message. Please do not reply.

Happy note-taking!

𝗧𝗵𝗲 𝗡𝗼𝘁𝗲𝗞𝗲𝗲𝗽𝗲𝗿 𝗧𝗲𝗮𝗺
    """
    from_email = settings.EMAIL_HOST_USER
    to_email = [username]

    try:
        send_mail(subject, message, from_email, to_email, fail_silently=False)
        print("Email sent successfully!")
    except Exception as e:
        print(f"An error occurred while sending the email: {str(e)}")


def send_reset_password_link(email, reset_link):
    subject = "Password Reset"
    message = f"""
Hi {email},

You recently requested to reset your password for your NoteKeeper account. Click the link below to reset it:

{reset_link}

If you did not request a password reset, please ignore this email. This link is only valid for the next 24 hours.

Note: This is an automated message. Please do not reply to this email.

Best regards,
𝗧𝗵𝗲 𝗡𝗼𝘁𝗲𝗞𝗲𝗲𝗽𝗲𝗿 𝗧𝗲𝗮𝗺
"""
    from_email = settings.EMAIL_HOST_USER
    to_email = [email]

    try:
        send_mail(subject, message, from_email, to_email, fail_silently=False)
        print(f"Password reset email sent to {email} with link {reset_link}")
    except Exception as e:
        print(f"An error occurred while sending the password reset email: {str(e)}")
