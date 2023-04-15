function login() {



    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('grant_type', 'password');
    formData.append('client_id', 'tenant-app');
  
    fetch('http://localhost:8080/realms/multitenancy/protocol/openid-connect/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formData
    })
    .then(response => {
      if (response.ok) {
        // Save the access token to localStorage
        response.json().then(data => {
          localStorage.setItem('access_token', data.access_token);
          // Redirect to the homepage after successful login
          window.location.href = "homepage.html";
        });
      } else if (response.status === 401) {
        response.json().then(data => {
          document.getElementById("error").innerHTML = `Error: ${data.error_description}`;
        });
      } else {
        // Handle other error responses
        throw new Error('Login failed.');
      }
    })
    .catch(error => {
      console.error(error);
    });
  }

  window.onload = function() {
    // Check if user is authenticated, redirect to login page if not
    const token = localStorage.getItem("access_token");
    if (token) {
      window.location.href = "homepage.html";
    }
 }
  
