<script>
    document.addEventListener('DOMContentLoaded', function() {
        const studentTab = document.getElementById('studentLoginTab');
        const facultyTab = document.getElementById('facultyLoginTab');
        let currentUserType = 'student';

        studentTab.addEventListener('click', function () {
            studentTab.classList.add('active');
            facultyTab.classList.remove('active');
            currentUserType = 'student';
        });

        facultyTab.addEventListener('click', function () {
            facultyTab.classList.add('active');
            studentTab.classList.remove('active');
            currentUserType = 'faculty';
        });

        const loginButton = document.getElementById('loginButton');
        const loginEmailInput = document.getElementById('loginEmail');
        const loginPasswordInput = document.getElementById('loginPassword');
        const loginEmailError = document.getElementById('loginEmailError');
        const loginPasswordError = document.getElementById('loginPasswordError');
        const loginSuccessMsg = document.getElementById('loginSuccessMsg');

        const validCredentials = {
            student: {
                email: 'student@example.com',
                password: 'student123'
            },
            faculty: {
                email: 'faculty@example.com',
                password: 'faculty123'
            }
        };

        loginButton.addEventListener('click', function () {
            loginEmailError.style.display = 'none';
            loginPasswordError.style.display = 'none';
            loginSuccessMsg.style.display = 'none';

            const email = loginEmailInput.value.trim();
            const password = loginPasswordInput.value.trim();
            let isValid = true;

            if (!email) {
                loginEmailError.textContent = 'Please enter your email or ID';
                loginEmailError.style.display = 'block';
                isValid = false;
            }

            if (!password) {
                loginPasswordError.textContent = 'Password is required';
                loginPasswordError.style.display = 'block';
                isValid = false;
            }

            if (!isValid) return;

            const validEmail = validCredentials[currentUserType].email;
            const validPassword = validCredentials[currentUserType].password;

            if (email === validEmail && password === validPassword) {
                loginSuccessMsg.style.display = 'block';

                setTimeout(() => {
                    window.location.href = currentUserType === 'student' ? 'student-dashboard.html' : 'faculty-dashboard.html';
                }, 2000);
            } else {
                loginPasswordError.textContent = 'Invalid email or password';
                loginPasswordError.style.display = 'block';
            }
        });
    });
</script>
