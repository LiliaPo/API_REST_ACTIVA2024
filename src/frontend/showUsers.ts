interface User {
    id: number;
    name: string;
    first_surname: string;
    userName: string;
    email: string;
}

interface AxiosResponse<T> {
    data: T;
    status: number;
    statusText: string;
}

declare const axios: {
    get: <T>(url: string) => Promise<AxiosResponse<T>>;
    delete: (url: string) => Promise<AxiosResponse<any>>;
};

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await axios.get<User[]>("http://localhost:3000/api/v1/users");
        const users = response.data;

        let htmlUsers = `
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Nombre usuario</th>
                        <th>Email</th>
                        <th>Actualizar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
        `;

        users.forEach((user: User) => {
            htmlUsers += `
                <tr>
                    <td>${user.name}</td>
                    <td>${user.first_surname}</td>
                    <td>${user.userName}</td>
                    <td>${user.email}</td>
                    <td>
                        <a class="update-button" href="http://localhost:3000/updateUser/${user.id}">
                            <img width="8px" src="../../media/icon/lapiz.png" alt="Editar">
                        </a>
                    </td>
                    <td>
                        <img class="delete-button" id="delete-${user.id}" 
                             width="8px" src="../../media/icon/basura.png" 
                             alt="Eliminar" style="cursor: pointer;">
                    </td>
                </tr>
            `;
        });

        htmlUsers += "</tbody></table>";
        
        const usersElement = document.getElementById("users");
        if (usersElement) {
            usersElement.innerHTML = htmlUsers;
        }

        document.querySelectorAll<HTMLImageElement>(".delete-button").forEach((button) => {
            button.addEventListener("click", async () => {
                const id = button.id.split("-")[1];
                if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
                    try {
                        await axios.delete(`http://localhost:3000/api/v1/users/${id}`);
                        location.reload();
                    } catch (error) {
                        console.error('Error al eliminar usuario:', error);
                        alert('Error al eliminar usuario');
                    }
                }
            });
        });
    } catch (error) {
        console.error('Error al cargar usuarios:', error);
        const usersElement = document.getElementById("users");
        if (usersElement) {
            usersElement.innerHTML = '<p>Error al cargar usuarios</p>';
        }
    }
});
