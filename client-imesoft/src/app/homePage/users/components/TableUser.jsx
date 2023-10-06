"use client"

const TableUser = ({ data }) => {
    return (
        <div className="p-4">
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Jerarquia</th>
                        <th>Sede</th>
                        <th>Config</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((user) => (
                        <tr key={user._id}>
                            <td>{user.fullname}</td>
                            <td>{user.hierarchy}</td>
                            <td></td>
                            <td></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TableUser