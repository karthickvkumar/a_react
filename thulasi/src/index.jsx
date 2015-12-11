var data = {
  "Dashboard": {
    "Dashboard": "/dashboard",
    "Graphs": "/graphs",
    "something else": "/something",
  },
  "Reports": {
    "Report1": "/report1",
    "Report2": "/report2",
    "Report3": "/report3",
    "Report4": "/report4",
    "Report5": "/report5"
  }
};

var data1 = [
  "Action",
  "Contact",
  "Something",
  "item",
  "List",
];

var Form = React.createClass({
  render: function() {
    return (
      <Container>
        <Row>
          <Column md-6>
            <h2>DropDown</h2>
            <Dropdownnew primary data={data}>Dropdown</Dropdownnew>
            <ClearFix/>
            <h2>DropDown Array</h2>
            <DropdownArray primary data={data1}>DropdownArray</DropdownArray>
            <ClearFix/>

            <h3>Well</h3>
            <Well>Well comes here</Well>
            <Well lg>Well comes here</Well>
            <Well sm>Well comes here</Well>
            <ClearFix/>

            <h3>ToolTip Top</h3>
            <ToolTip title="ToolTip Top" data-placement="top" success>ToolTip Top</ToolTip>
            <h3>ToolTip Left</h3>
            <ToolTip title="ToolTip Left" data-placement="left"  warning>ToolTip Left</ToolTip>
            <h3>ToolTip Right</h3>
            <ToolTip title="ToolTip Right" data-placement="right"  danger>ToolTip Right</ToolTip>
            <h3>ToolTip Bottom</h3>
            <ToolTip title="ToolTip Bottom" data-placement="bottom"  info>ToolTip Bottom</ToolTip>
            <ClearFix/>

            <h3>Collapse</h3>
            <Collapse primary data-target="#demo">Content</Collapse>
            <div id="demo" className="collapse">
              <Well>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </Well>
            </div>
            <h3> Accordion Collapse</h3>
            <PanelGroup>
              <Panel>
                <PanelHeading>
                  <Collapse primary data-target="#panel1">Content</Collapse>
                </PanelHeading>
                <Panel id="panel1"  className="collapse">
                  <PanelBody>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                    commodo consequat.
                  </PanelBody>
                </Panel>
              </Panel>
              <Panel>
                <PanelHeading>
                  <Collapse success data-target="#panel2">Content</Collapse>
                </PanelHeading>
                <Panel id="panel2"  className="collapse">
                  <PanelBody>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                    commodo consequat.
                  </PanelBody>
                </Panel>
              </Panel>
            </PanelGroup>
          </Column>

          <Column md-6>
            <h3> Single Button DropDown</h3>
            <ButtonGroup>
              <SingleButtonDropDown sm info data={data1}>Single Dropdown</SingleButtonDropDown>
              <Button lg success>Button</Button>
            </ButtonGroup>

            <Row>
              <Column md-6>
                <h3>Split Button DropDown</h3>
                <SplitButtonDropdown xs xs danger data={data1}>Danger</SplitButtonDropdown>
                <SplitButtonDropdown sm sm success data={data1}>Success</SplitButtonDropdown>
                <SplitButtonDropdown md md warning data={data1}>Warning</SplitButtonDropdown>
                <SplitButtonDropdown lg lg primary data={data1}>Primary</SplitButtonDropdown>
                <ClearFix />
                <h3>New Dropdown</h3>
                <Dropdown>
                <ButtonToggle success xs>New</ButtonToggle>
                <DropdownMenu data={data}/>
                </Dropdown>
              </Column>
            </Row>
          </Column>
        </Row>
        <Row>
          <Column md-6>
            <h3>List Groups Bages</h3>
            <ListGroup>
              <ListGroupItem><Badge>12</Badge> Roll No</ListGroupItem>
              <ListGroupItem><Badge>12</Badge> Roll No</ListGroupItem>
              <ListGroupItem><Badge>12</Badge> Roll No</ListGroupItem>
            </ListGroup>
            <ClearFix />

            <h3>Linked Items</h3>
            <ListGroup>
              <LinkListGroupItem href="#">Link 1</LinkListGroupItem>
              <LinkListGroupItem href="#" active>Link 2</LinkListGroupItem>
              <LinkListGroupItem href="#">Link 3</LinkListGroupItem>
              <LinkListGroupItem href="#" >Link 4</LinkListGroupItem>
            </ListGroup>
            <ClearFix />

            <h3>Button Items</h3>
            <ListGroup>
              <Button className="list-group-item">Button 1</Button>
              <Button className="list-group-item">Button 2</Button>
              <Button className="list-group-item">Button 3</Button>
            </ListGroup>
          </Column>
          <Column md-6>
            <h3>Disabled Items</h3>
            <ListGroup>
              <LinkListGroupItem href="#">Link 1</LinkListGroupItem>
              <LinkListGroupItem href="#" disabled>Link 2</LinkListGroupItem>
              <LinkListGroupItem href="#" disabled>Link 3</LinkListGroupItem>
              <LinkListGroupItem href="#">Link 4</LinkListGroupItem>
            </ListGroup>
            <ClearFix />

            <h3>Custom Content</h3>
            <ListGroup>
              <LinkListGroupItem href="#" active>
                <ListGroupItemHeader>Custom Content</ListGroupItemHeader>
                <ListGroupItemText>Add nearly any HTML within,even for linked list groups like the one below</ListGroupItemText>
              </LinkListGroupItem>
              <LinkListGroupItem href="#">
                <ListGroupItemHeader>Custom Content</ListGroupItemHeader>
                <ListGroupItemText>Add nearly any HTML within,even for linked list groups like the one below</ListGroupItemText>
              </LinkListGroupItem>
              <LinkListGroupItem href="#">
                <ListGroupItemHeader>Custom Content</ListGroupItemHeader>
                <ListGroupItemText>Add nearly any HTML within,even for linked list groups like the one below</ListGroupItemText>
              </LinkListGroupItem>
            </ListGroup>
            <ClearFix />

            <h3>Contextual Classes</h3>
            <ListGroup>
              <LinkListGroupItem success href="#">Link 1</LinkListGroupItem>
              <LinkListGroupItem danger href="#">Link 2</LinkListGroupItem>
              <LinkListGroupItem warning href="#">Link 3</LinkListGroupItem>
              <LinkListGroupItem info href="#" >Link 4</LinkListGroupItem>
            </ListGroup>
            <ClearFix />

            <ListGroup>
              <ListGroupItem success> Link 1</ListGroupItem>
              <ListGroupItem danger> Link 2 </ListGroupItem>
              <ListGroupItem warning> Link 3</ListGroupItem>
              <ListGroupItem info> Link 4</ListGroupItem>
            </ListGroup>
            <ClearFix />
          </Column>
        </Row>
      </Container>
    )
  }
});

var mainContainer = (
  <Container fluid id="mainContainer">
    <Row>
      <Column sm-2 md-2>
        <ClearFix show-xs  />
      </Column>
      <Column sm-10 md-10 id="container">
      </Column>
    </Row>
  </Container>
);

React.render(mainContainer, document.body);
React.render(<Form />, document.getElementById("container"));