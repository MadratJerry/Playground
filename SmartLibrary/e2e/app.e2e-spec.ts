import { LibraryPage } from './app.po';

describe('library App', () => {
  let page: LibraryPage;

  beforeEach(() => {
    page = new LibraryPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
