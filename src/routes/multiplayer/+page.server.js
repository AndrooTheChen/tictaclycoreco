// Get the game state from the server to initaize the board.
export const load = async function (params) {
    const response = await fetch(`http://localhost:3000/initGame`);
    console.log(response.status);

    const data = await response.text();
    console.log(data);
    let board = JSON.parse(data);
    return { board: board };
    // parse response.board from JSON to an array of 9 large
    // let board = JSON.parse(response);
    // return { board: JSON.stringify(response.body) };
}

// /** @type {import ('./$types').Actions} */
// export const actions = {
//     update: async (event) => {
//         console.log(`recived ${event}, updating board`);
//         const response = await fetch(`http://localhost:3000/updateGame`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(event)
//         });
//         console.log(response.status);
//         const data = await response.text();
//         console.log(data);
//         let board = JSON.parse(data);
//         return { board: board };
//     }
// }