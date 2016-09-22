import { EuEdgePage } from './app.po';

describe('eu-edge App', function() {
  let page: EuEdgePage;

  beforeEach(() => {
    page = new EuEdgePage();
  });

  it('should display message saying EU Edge', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('EU Edge');
  });

  // TODO: need more tests

});
