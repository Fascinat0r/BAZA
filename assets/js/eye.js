function onSubmit(token) {
    document.getElementById("user-form").submit();
  }
  const passwordInput = document.getElementById('password');
  const togglePasswordButton = document.getElementById('togglePassword');
  const showEyeIcon = document.getElementById('show_eye');

  togglePasswordButton.addEventListener('click', function() {
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      showEyeIcon.classList.replace('bi-eye', 'bi-eye-slash');
    } else {
      passwordInput.type = 'password';
      showEyeIcon.classList.replace('bi-eye-slash', 'bi-eye');
    }
  });