const Router = require("express").Router()

const SkillRouter = require("./SkillRoutes")
const ServiceRouter = require("./ServiceRoutes")
const PortfolioRouter = require("./PortfolioRoutes")
const TestimonialRouter = require("./TestimonialRoutes")
const UserRouter = require("./UserRoutes")
const ContactUsRouter = require("./ContactUsRoutes")
const EducationRouter = require("./EducationRoutes")
const ExperienceRouter = require("./ExperienceRoutes copy")
const CertificateRouter = require("./CertificateRoutes")

Router.use("/skill", SkillRouter)
Router.use("/service", ServiceRouter)
Router.use("/portfolio", PortfolioRouter)
Router.use("/certificate", CertificateRouter)
Router.use("/education", EducationRouter)
Router.use("/experience", ExperienceRouter)
Router.use("/user", UserRouter)
Router.use("/contactus", ContactUsRouter)
Router.use("/testimonial", TestimonialRouter)

module.exports = Router