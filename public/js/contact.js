
  const form = document.getElementById('contactForm');
  const responseBox = document.getElementById('responseMessage');
  const submitButton = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      message: form.message.value.trim()
    };

    // Disable button while sending
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      responseBox.style.display = 'block';

      if (data.success) {
        responseBox.textContent = data.msg;
        responseBox.className = 'success';
        form.reset();

        // Change button text to "Sent" temporarily
        submitButton.textContent = "Sent";

        setTimeout(() => {
          submitButton.textContent = "Send Message";
          submitButton.disabled = false;
        }, 3000); // 3 seconds
      } else {
        responseBox.textContent = data.msg || "❌ Error sending message";
        responseBox.className = 'error';
        submitButton.textContent = "Send Message";
        submitButton.disabled = false;
      }

      // Hide message popup after 4 seconds
      setTimeout(() => responseBox.style.display = 'none', 4000);

    } catch (err) {
      responseBox.style.display = 'block';
      responseBox.textContent = "❌ Something went wrong!";
      responseBox.className = 'error';
      submitButton.textContent = "Send Message";
      submitButton.disabled = false;
      setTimeout(() => responseBox.style.display = 'none', 4000);
      console.error(err);
    }
  });

