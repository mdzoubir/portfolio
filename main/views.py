from django.conf import settings
from django.core.mail import send_mail
from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_exempt


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

        # Construct the email message
        message = f"Name: {name}\nEmail: {email}\n\n{comments}"
        try:
            send_mail(
                subject,
                message,
                email,  # From email (sender)
                [settings.EMAIL_HOST_USER],  # To email (recipient)
                fail_silently=False,
            )
            return JsonResponse({'success': 'Your message has been sent!'})
        except Exception as e:
            return JsonResponse({'error': f'Error sending email: {e}'}, status=500)
    return JsonResponse({'error': 'Invalid request method'}, status=400)