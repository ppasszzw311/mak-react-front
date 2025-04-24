

export const loginPost = async (username, password) => {
    const API_URL = import.meta.env.VITE_API_URL;
    try {
        const response = await fetch(`${API_URL}/Nug/Auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ Id: username, password: password }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}