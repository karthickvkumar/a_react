import React from 'react';
import Container from './container';
import Row from './row';
import Column from './column';
import Clearfix from './clearfix';
import Alert from './alert';
import Button from './button';
import ButtonGroup from './buttongroup';
import ButtonToolbar from './buttontoolbar';
import Pagination from './pagination';
import Pager from './pager';
import Breadcrumb from './breadcrumb';
import Thumbnail from './thumbnail';
import Caption from './caption';
import Tabs from './tabs';
import Media from './media';
import MediaList from './medialist';
import MediaBody from './mediabody';
import DropdownArray from './dropdownarray';


var data = [
  "item1", "item2", "item3"
]

var Form = React.createClass({
    render: function() {
        return (
            <Container>
            	<Row>
            		<Column md-6>
                        <h1>React Components v0.14.1</h1>//
                        <h3>Alert</h3>
                        <Alert success>Alert box</Alert>
                        <Alert hasDismiss info>calling this <a className="alert-link">this is link</a></Alert>
                        <Alert hasDismiss warning>This is alert dismissible box</Alert>
                        <Clearfix />

                        <h3>Button</h3>
                        <Button primary>Primary</Button>
                        <Clearfix />

                        <h3>ButtonGroup</h3>
                        <ButtonGroup>
                            <Button info>Left</Button>
                            <Button info>Middle</Button>
                            <Button info>Right</Button>
                        </ButtonGroup>
                        <Clearfix />

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
                        <Clearfix />

                        <h3>ButtonGroup sizing</h3>
                        <h3>ButtonGroup large</h3>
                        <ButtonGroup lg>
                            <Button primary>Left</Button>
                            <Button primary>Middle</Button>
                            <Button primary>Right</Button>
                        </ButtonGroup>
                        <Clearfix />

                        <h3>ButtonGroup medium</h3>
                        <ButtonGroup md>
                            <Button info>Left</Button>
                            <Button info>Middle</Button>
                            <Button info>Right</Button>
                        </ButtonGroup>
                        <Clearfix />

                        <h3>ButtonGroup small</h3>
                        <ButtonGroup sm>
                            <Button success>Left</Button>
                            <Button success>Middle</Button>
                            <Button success>Right</Button>
                        </ButtonGroup>
                        <Clearfix />

                        <ButtonGroup xs>
                        <h3>ButtonGroup extra-small</h3>
                            <Button warning>Left</Button>
                            <Button warning>Middle</Button>
                            <Button warning>Right</Button>
                        </ButtonGroup>
                        <Clearfix />

                        <h3>Breadcrumbs</h3>
                        <Breadcrumb>
                            <li>home</li>
                            <li>contact</li>
                            <li>action</li>
                            <li><a href="#">library</a></li>
                            <li className="active">data</li>
                        </Breadcrumb>
                        <Clearfix />

                        <h3>Tabs</h3>
                        <Tabs>
                            <li><a href="#">Home</a></li>
                            <li className="active"><a href="#">Menu 1</a></li>
                            <li><DropdownArray data={data}>Menu 2</DropdownArray></li>
                            <li><a href="#">Menu 3</a></li>
                        </Tabs>
                        <Clearfix />
                    </Column>

                    <Column md-6>
                        <h3>Pagination</h3>
                        <Pagination />
                        <Clearfix />

                        <h3>Pagination Sizing</h3>
                        <Pagination lg />
                        <Pagination sm />
                        <Clearfix />

                        <h3>Pager</h3>
                        <Pager>
                            <li><a href="#">Previous</a></li>
                            <li><a href="#">Next</a></li>
                        </Pager>
                        <Clearfix />

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
                            <Clearfix />
                        </Column>
                	</Column>
            	</Row>
            </Container>
        );
  	}
});

ReactDOM.render(<Form />, document.getElementById("content"));
