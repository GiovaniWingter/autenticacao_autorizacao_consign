module.exports = (application) => {

    return {
        verificarUsuAutenticado: (req, res, next) => {
            if (req.session.autenticado) {
                var autenticado = req.session.autenticado;
            } else {
                var autenticado = { autenticado: null };
            }
            req.session.autenticado = autenticado;
            next();
        },

        limparSessao: (req, res, next) => {
            req.session.destroy();
            next()
        },

        gravarUsuAutenticado: async (req, res, next) => {
            erros = application.config.middlewares.validationResult(req)
            if (erros.isEmpty()) {
                var dadosForm = {
                    user_usuario: req.body.nome_usu,
                    senha_usuario: req.body.senha_usu,
                };
                var results = await application.app.models.usuario.findUserEmail(dadosForm);
                console.log(results);
                var total = Object.keys(results).length;
                if (total == 1) {
                    if (application.config.middlewares.bcrypt.compareSync(dadosForm.senha_usuario, results[0].senha_usuario)) {
                        var autenticado = {
                            autenticado: results[0].nome_usuario,
                            id: results[0].id_usuario,
                            tipo: results[0].tipo_usuario
                        };
                        console.log(req.session.autenticado);
                    }
                } else {
                    var autenticado = null;
                }
            } else {
                var autenticado = null;
            }
            req.session.autenticado = autenticado;
            next();
        },

        verificarUsuAutorizado: (tipoPermitido, destinoFalha) => {
            return (req, res, next) => {
                if (req.session.autenticado.autenticado != null &&
                    tipoPermitido.find(function (element) { return element == req.session.autenticado.tipo }) != undefined) {
                    next();
                } else {
                    res.render(destinoFalha, req.session.autenticado);
                }
            };
        }

    }

}
