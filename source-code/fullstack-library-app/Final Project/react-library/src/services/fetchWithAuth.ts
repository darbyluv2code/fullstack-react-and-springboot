function isTokenExpired(token: string): boolean {
    try {
        const payload = JSON.parse(atob(token.split(".")[1]));

        if (!payload.exp) {
            return true;
        }

        const currentTime = Math.floor(Date.now() / 1000);
        return payload.exp < currentTime + 10;
    } catch (error) {
        console.error("Error parsing token", error)
        return true;
    }
}


export async function fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response> {
    const token = localStorage.getItem("token");

    if (!token) {
        localStorage.removeItem("token");
        window.location.href = "/";
        throw new Error("No authentication token found");
    }

    if (isTokenExpired(token)) {
        localStorage.removeItem("token");
        window.location.href = "/";
        throw new Error("Authentication token expired");
    }

    const headers = {
        ...options.headers,
        "Authorization": `Bearer ${token}`
    }

    const response = await fetch(url, {
        ...options,
        headers
    });

    if (response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/";
        throw new Error("Authentication failed");
    }

    return response
}