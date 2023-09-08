"use server";
export async function sendRequest({ method, endpoint, body, tag, headers }) {
    const baseUrl = "http://localhost:3000/api"; // Replace with your base URL
    const url = `${baseUrl}${endpoint}`;
    const requestOptions = {
        method: method,
        headers: headers ? headers : { "Content-Type": "application/json" },
        cache:"no-store"
    };

    if (body) {
        requestOptions.body = JSON.stringify(body);
    }

    if (tag) {
        requestOptions.next = {
            tags: [tag],
        };
    }
    const response = await fetch(url, requestOptions);
    const data = await response.json()

    // if(response.status === 500) return redirect("/500")
    // if(response.status === 404) return notFound()
    return {message:data.Message,status:response.ok,data}
}
