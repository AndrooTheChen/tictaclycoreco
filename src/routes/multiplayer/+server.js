// export async function POST({ request }) {
//     console.log(`recieved ${request}, updating board`);
//     const response = await fetch(`http://localhost:3000/updateGame`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(request)
//     });
//     console.log(response.status);
//     const data = await response.text();
//     console.log(data);
//     let board = JSON.parse(data);
//     return { board: board };
// }
