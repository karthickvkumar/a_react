var data = [
  "item1","item2"
]

var Component = React.createClass({
  render: function(){
    return (
        <Container>
            <Row>
                <Column md-6>
                        <h1>React Library</h1>
                        <h3>Alerts</h3>
                        <Alert success>This is alert box</Alert>
                        <Alert hasDismiss info>calling this <a className="alert-link">this is link</a></Alert>
                        <Alert danger>This is alert box</Alert>
                        <Alert hasDismiss success>This is alert dismissible box</Alert>
                        <ClearFix />

                        <h3>ButtonGroup</h3>
                        <ButtonGroup>
                            <Button info>Left</Button>
                            <Button info>Middle</Button>
                            <Button info>Right</Button>
                        </ButtonGroup>
                        <ClearFix />

                        <h3>ButtonGroup sizing</h3>
                        <ButtonGroup lg>
                            <Button primary>Left</Button>
                            <Button primary>Middle</Button>
                            <Button primary>Right</Button>
                        </ButtonGroup>
                        <ClearFix />
                        <ButtonGroup md>
                            <Button info>Left</Button>
                            <Button info>Middle</Button>
                            <Button info>Right</Button>
                        </ButtonGroup>
                        <ClearFix />
                        <ButtonGroup sm>
                            <Button success>Left</Button>
                            <Button success>Middle</Button>
                            <Button success>Right</Button>
                        </ButtonGroup>
                        <ClearFix />
                        <ButtonGroup xs>
                            <Button warning>Left</Button>
                            <Button warning>Middle</Button>
                            <Button warning>Right</Button>
                        </ButtonGroup>
                        <ClearFix />


                        <h3>ButtonToolbar</h3>
                        <ButtonToolbar>
                        <ButtonGroup>
                            <Button info>1</Button>
                            <Button info>2</Button>
                            <Button info>3</Button>
                        </ButtonGroup>
                        <ButtonGroup>
                            <Button danger>4</Button>
                            <Button danger>5</Button>
                            <Button danger>6</Button>
                        </ButtonGroup>
                        <ButtonGroup>
                            <Button success>7</Button>
                            <Button success>8</Button>
                            <Button success>9</Button>
                        </ButtonGroup>
                        </ButtonToolbar>

                    <h3>Breadcrumbs</h3>
                    <Breadcrumb>
                        <li>home</li>
                        <li>contact</li>
                        <li>action</li>
                        <li><a href="#">library</a></li>
                        <li className="active">data</li>
                    </Breadcrumb>
                    <ClearFix />

                    <h3>Tabs</h3>
                    <Tabs>
                        <li><a href="#">Home</a></li>
                        <li className="active"><a href="#">Menu 1</a></li>
                        <li><DropdownArray data={data}>Menu 2</DropdownArray></li>
                        <li><a href="#">Menu 3</a></li>
                    </Tabs>
                    <ClearFix />

                    <h3>Auto-Complete</h3>
                    <Autocomplete />
                    <ClearFix />
                </Column>

                <Column md-6>
                    <h3>Pagination</h3>
                    <Pagination />
                    <ClearFix />

                    <h3>Pagination Sizing</h3>
                    <Pagination lg />
                    <Pagination sm />
                    <ClearFix />

                    <h3>Pager</h3>
                    <Pager>
                        <li><a href="#">Previous</a></li>
                        <li><a href="#">Next</a></li>
                    </Pager>
                    <ClearFix />

                    <Row>
                        <Column xs-6 md-3>
                            <h3>Thumbnail</h3>
                                <Thumbnail>
                                <a href="#"><img src="images/deer.jpeg" /></a>
                                </Thumbnail>
                        </Column>
                        <Column xs-6 md-3>
                            <h3>ThumbnailCustom</h3>
                            <Thumbnail>
                            <a href="#"><img src="images/nature.jpeg" /></a>
                            <Caption>
                            <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam.
                             Donec id elit non mi porta gravida at eget metus.
                             Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
                            <Button primary>Button</Button>
                            </Caption>
                            </Thumbnail>
                        </Column>
                    </Row>
                </Column>

                <Column xs-6>
                    <h3>Media</h3>
                    <Media>
                        <MediaList>
                            <div className="media-left">
                                <a href="#"><img className="media-object" src="images/panda.jpeg" width={75} height={50} /></a>
                            </div>
                        <MediaBody right>
                            <h4>Media heading</h4>
                            <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
                        </MediaBody>
                        </MediaList>
                    </Media>
                    <ClearFix />
                </Column>
            </Row>
        </Container>
    );
  }
});

React.render(<Component />,document.getElementById("content"));
