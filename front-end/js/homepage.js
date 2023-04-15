function logout() {
    // Send a POST request to the REST API to revoke the access token
    // and invalidate the session
    localStorage.removeItem('access_token');

    // After successful logout, redirect to the login page
    window.location.href = "login.html";
  }
  
  function decodeToken() {
    const token = localStorage.getItem("access_token");
    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      document.getElementById("token").innerHTML = JSON.stringify(decodedToken, null, 2);
      document.getElementById("user").innerHTML = "user : "+decodedToken.preferred_username;
      document.getElementById("tenant").innerHTML = "tenant : "+decodedToken.apiUrl;

    }
  }
  
  window.onload = function() {
    // Check if user is authenticated, redirect to login page if not
    const token = localStorage.getItem("access_token");
    if (!token) {
      window.location.href = "login.html";
    }
  
    decodeToken();
  }
  