document.getElementById('sign-in-submit').addEventListener('submit', async function(event) {
    event.preventDefault();

    const newUser = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    };

    console.log(newUser);

    try {
        const response = await fetch('http://127.0.0.1:3000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        });

        const result = await response.json();
        console.log('Server response:', result);

        if (result.error) {
            alert(result.error);
        } else {
            alert('User registered successfully!');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});