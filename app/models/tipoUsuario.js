module.exports = function (application) {

    const tipoUsuarioModel = {
        findAll: async () => {
            try {
                const [resultados] = await application.config.pool_conexoes.query(
                    'SELECT * FROM tipo_usuario where status_tipo_usuario = 1 '
                )
                return resultados;
            } catch (error) {
                return error;
            }
        },
        
        findId: async (id) => {
            try {
                const [resultados] = await application.config.pool_conexoes.query(
                    "select * from tipo_usuario where id_tipo_usuario = ? and  status_tipo_usuario = 1",
                    [id]
                )
                return resultados;
            } catch (error) {
                return error;
            }
        },
        create: async (camposJson) => {
            try {
                const [resultados] = await application.config.pool_conexoes.query(
                    "insert into tipo_usuario set ?",
                    [camposJson]
                )
                return resultados;
            } catch (error) {
                return error;
            }
        },
        update: async (camposJson) => {
            try {
                const [resultados] = await application.config.pool_conexoes.query(
                    "UPDATE tipo_usuario SET tipo_usuario = ?, descricao_usuario = ? WHERE id_tipo_usuario = ?",
                    [camposJson.tipo_usuario, camposJson.descricao_usuario, camposJson.id_tipo_usuario],
                )
                return resultados;
            } catch (error) {
                return error;
            }
        },
        delete: async (id) => {
            try {
                const [resultados] = await application.config.pool_conexoes.query(
                    "UPDATE tipo_usuario SET status_tipo_usuario = 0 WHERE id_tipo_usuario = ?", [id]
                )
                return resultados;
            } catch (error) {
                return error;
            }
        }
    };

    return tipoUsuarioModel

}