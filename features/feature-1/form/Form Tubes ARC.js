document.getElementById('submissionForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const shortDescription = document.getElementById('shortDescription').value;

    console.log('Title:', title);
    console.log('Content:', content);
    console.log('Short Description:', shortDescription);

    const photoInput = document.getElementById('photo');
    if (photoInput.files.length > 0) {
        console.log('Photo filename:', photoInput.files[0].name);
    }
    
    alert('Form berhasil dikumpulkan!.');
});
