declare const axios: any;

document.addEventListener("DOMContentLoaded", async () => {
    const result = await axios.get("http://localhost:3000/api/v1/users");
    let htmlUsers = "<table><thead><td>Nombre</td><td>Apellido</td><td>Nombre usuario</td><td>Email</td><td>Actualizar</td><td>Eliminar</td></thead>";
    result.data.forEach((user:any)=>{htmlUsers += `<tr><td>${user.name}</td><td>${user.first_surname}</td><td>${user.userName}</td><td>${user.email}</td>button id="update "<td><img width="8px" src="../../media/icon/lapiz.png"></td>button id="delete "<td><img width="8px" src="../../media/icon/basura.png"></td></tr>`});
    htmlUsers += "</table>";
    document.getElementById("users")!.innerHTML = htmlUsers;
});
