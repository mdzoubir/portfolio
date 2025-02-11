from django.conf import settings
from django.core.mail import send_mail
from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_exempt
import re


# Create your views here.
def home(request):
    return render(request, 'main/index.html')


@csrf_exempt  # Allows AJAX requests without CSRF token in headers
def contact_view(request):
    if request.method == 'POST':
        # Capture form data from POST request
        name = request.POST.get('name')
        email = request.POST.get('email')
        subject = request.POST.get('subject')
        comments = request.POST.get('comments')

        # Basic server-side validation
        if not name or not email or not subject or not comments:
            return JsonResponse({'error': 'All fields are required.'}, status=400)

        # Email validation
        if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
            return JsonResponse({'error': 'Invalid email address.'}, status=400)

        # Construct the email message (consider using HTML for better formatting)
        message = f"""
        <html>
            <body>
                <h3>New Contact Form Submission</h3>
                <p><strong>Name:</strong> {name}</p>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Subject:</strong> {subject}</p>
                <p><strong>Message:</strong></p>
                <p>{comments}</p>
            </body>
        </html>
        """

        try:
            # Send the email
            send_mail(
                subject,
                '',
                settings.DEFAULT_FROM_EMAIL,
                [settings.EMAIL_HOST_USER],
                html_message=message,
                fail_silently=False,
            )
            return JsonResponse({'success': 'Your message has been sent!'})
        except Exception as e:
            return JsonResponse({'error': f'Error sending email: {str(e)}'}, status=500)

    return JsonResponse({'error': 'Invalid request method'}, status=400)
