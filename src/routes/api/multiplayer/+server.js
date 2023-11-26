export async function POST({ request }) {
    // TODO: figure out how to push the request body to the server without having to parse it.
    const { board } = await request.json();
    console.log(`board: ${board}`);
    const response = await fetch(`http://localhost:3000/updateGame`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(board)
    });
    console.log(response.status);
    const data = await response.text();
    console.log(data);
    // let board = JSON.parse(data);
    return new Response(null, { status: 200 });
}
