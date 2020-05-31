import Page from "../models/Page";

let BackButtonPrevPage: Page = Page.LOGIN;

export let setBackPage = (page: Page) => BackButtonPrevPage = page;

export default BackButtonPrevPage;