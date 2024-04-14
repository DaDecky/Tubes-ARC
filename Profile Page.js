document.addEventListener('DOMContentLoaded', () => {
    const uploadInput = document.getElementById('upload-picture');
    const profilePicture = document.getElementById('profile-picture');
  
    uploadInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = () => {
        profilePicture.src = reader.result;
      };
      
      reader.readAsDataURL(file);
    });
  
    const submitBtn = document.getElementById('submit-btn');
    submitBtn.addEventListener('click', () => {
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      const bio = document.getElementById('bio').value;
      const birthday = document.getElementById('birthday').value;
      
      
      console.log('Username:', username);
      console.log('Password:', password);
      console.log('Bio:', bio);
      console.log('Birthday:', birthday);
    });
  });
  