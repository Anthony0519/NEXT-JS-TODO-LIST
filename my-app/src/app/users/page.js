// import userModel from './userModel'
// import dbConnect from './db-config'

// const getUsers = async()=>{
//     const res = await fetch('http://localhost:3000/api/users')
//     const data = await res.json()
//     return data
// }

// export default async function users(){
//     await dbConnect()
//     const users = await userModel.find()
//     // const users = await getUsers()
//     return(
//         <>
//         <div>
//             <h1>Users</h1>
//             {
//                 users.map((e)=>(
//                     <div key={e._id}>
//                         <h3>Name: {e.firstName}</h3>
//                         <p>email: {e.email}</p>
//                     </div>
//                 ))
//             }
//         </div>
//         </>
//     )
// }