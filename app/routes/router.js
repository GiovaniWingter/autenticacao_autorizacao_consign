module.exports = function (application) {
  var express = require("express");
  var router = express.Router();

  router.get("/", application.app.models.autenticador_middleware.verificarUsuAutenticado, function (req, res) {
    res.render("pages/index", req.session.autenticado);
  });

  router.get("/sair", application.app.models.autenticador_middleware.limparSessao, function (req, res) {
    res.redirect("/");
  });

  router.get("/login", function (req, res) {
    res.render("pages/login", { listaErros: null });
  });

  router.post(
    "/login",
    application.app.controllers.usuario
    .regrasValidacaoFormLogin,
    application.app.models.autenticador_middleware.gravarUsuAutenticado,
    function (req, res) {
      application.app.controllers.usuario.logar(application, req, res);
    });

  router.get("/cadastro", function (req, res) {
    res.render("pages/cadastro", { listaErros: null, valores: { nome_usu: "", nomeusu_usu: "", email_usu: "", senha_usu: "" } });
  });

  router.post("/cadastro",
    application.app.controllers.usuario
    .regrasValidacaoFormCad,
    async function (req, res) {
      application.app.controllers.usuario.cadastrar(application, req, res);
    });

  router.get(
    "/adm",
    application.app.models.autenticador_middleware.verificarUsuAutorizado([2, 3], "pages/restrito"),
    function (req, res) {
      res.render("pages/adm", req.session.autenticado);
    });

  application.use("/", router);

}