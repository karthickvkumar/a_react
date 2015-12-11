import React from 'react';
import Typeahead from 'react-typeahead';
import Container from './container';
import Row from './row';
import Column from './column';
import ClearFix from './clearfix';
import Button from './button';
import Navbar from './navbar';
import NavbarHeader from './navbar_header';
import NavbarBrand from './navbar_brand';
import Navs from './navs';
import Panel from './panel';
import PanelHeading from './panelheading';
import PanelBody from './panelbody';
import PanelFooter from './panelfooter';
import Table from './table';
import THead from './tableheader';
import TBody from './tablebody';
import PopOver from './popover';
import ListGroup from './listgroup';
import Element from './element';
import NavLink from './nav_link';
import Form from './form';
import FormGroup from './form_group';
import TextInput from './text_input';
import Span from './span';
import BadgeNavs from './bagde_nav';
import Progress from './progress.js';
import ProgressBar from './progress_bar';
import Embed from './embed';
import IFrame from './iframe';
import Modal from './modal';
import ModalDialog from './modal_dialog';
import ModalHeader from './modal_header';
import ModalTitle from './modal_title';
import ModalBody from './modal_body';
import ModalFooter from './modal_footer';
import Img from './img';
import Carousel from './carousel';
import CarouselList from './carousel_list';
import CarouselSlide from './carousel_slide';
import CarouselItem from './carousel_item';
import CarouselControl_Left from './carouselcontrol_left';
import CarouselControl_Right from './carouselcontrol_right';
import FilePreview from './filepreview';
import ImageView from './imageview';
import CostItem from './cost_item';
import HasMany from './has_many';
import DateRange from './date_range';
var data = {
  costitems:[
    {
      "project_id"      : "#",
      "cost_item"       : "#",
      "total_value"     : "#",
      "already_paid"    : "#",
      "gross_balance"   : "#",
      "gross_allocation": "#",
      "deductions"      : "#",
      "net_amount"      : "#",
      "notes"           : "#"
    }
  ],
  structure:[
    {
      "type"    :"select",
      "option"  :list_items
    },{
      "type"    :"text",
      "option"  :"product_name"
    },{
      "type"    :"radio",
      "option"  :"radio_button"
    },{
      "type"    :"checkbox",
      "option"  :"first_name"
    },{
      "type"    :"span",
      "option"  :"$100"
    },{
      "type"    :"text",
      "option"  :"total_value"
    },{
      "type"    :"span",
      "option"  :"total_amount"
    },{
      "type"    :"text",
      "option"  :"checkbox_button"
    },{
      "type"    :"text",
      "option"  :"total_value"
    }
  ]
};
var list_items = {
    "apera"   :"1",
    "tamame"  :"2",
    "varchas" :"3"
}
var thead_data1 = [
  "Project",
  "Cost Item",
  "Total Value",
  "Already Paid",
  "Gross Balance",
  "Gross Allocation Now",
  "Deductions",
  "Net Amount Allocated",
  "Notes",
  "Action"
];
var tbody_data = [
  {
    "r1cell"  :1,
    "r2cell"  :"kumar",
    "r3cell"  :"karthick@atomicits.com",
  },
  {
    "r1cell"  :2,
    "r2cell"  :"karthick",
    "r3cell"  :"kumar@atomicits.com",
  },
  {
    "r1cell"  :3,
    "r2cell"  :"kumar",
    "r3cell"  :"k@atomicits.com",
  }
];
var thead_data = [
  "ID",
  "Name",
  "Email"
];
var list_data = [
  "List Data 1",
  "List Data 2",
  "List Data 3",
];
var navs_data = [
  {
    "name"  : "Home",
    "path"  : "/home/path",
    "value" : "active"
  },{
    "name"  : "profile",
    "path"  : "/profile/path",
    "value" : "inactive"
  },{
    "name"  : "Message",
    "path"  : "/message/path",
    "value" : "inactive"
  }
]
var navs_data2 = [
  {
    "name"  : "Home",
    "path"  : "/home/path",
    "value" : "active"
  },{
    "name"  : "profile",
    "path"  : "/profile/path",
    "value" : "inactive"
  },{
    "name"  : "Message",
    "path"  : "/message/path",
    "value" : "inactive"
  },{
    "name"  : "Disabled link",
    "path"  : "/message/path",
    "value" : "inactive disabled"
  }
]
var badge_navs_data3 = [
  {
    "name"    : "Home",
    "path"    : "/home/path",
    "value"   : "active",
    "badge"   : "badge",
    "b_value" : ""
  },{
    "name"    : "profile",
    "path"    : "/profile/path",
    "value"   : "inactive",
    "badge"   : "badge",
    "b_value" : ""
  },{
    "name"    : "Message",
    "path"    : "/message/path",
    "value"   : "inactive",
    "badge"   : "badge",
    "b_value" : "35"
  }
]
var c_data = [
  {
  "count" : 0,
  "src"   : "https://d2eip9sf3oo6c2.cloudfront.net/series/covers/000/000/005/full/react_flux_series_banner_2.png?1404147531"
  },{
  "count" : 1,
  "src"   : "https://d2eip9sf3oo6c2.cloudfront.net/series/covers/000/000/005/full/react_flux_series_banner_2.png?1404147531"
  }, {
  "count" : 2,
  "src"   : "https://d2eip9sf3oo6c2.cloudfront.net/series/covers/000/000/005/full/react_flux_series_banner_2.png?1404147531"
  }
]
var Components = React.createClass({
  render: function() {
    return (
    <Container>
    <Row>
    <Column>
    <h3>NavBar</h3>
    <h5>NavBar - Default Navbar</h5>
        <Navbar>
          <NavbarHeader>
            <NavbarBrand href="#">Brand</NavbarBrand>
          </NavbarHeader>
            <Navs data={navs_data} navbar/>
        </Navbar>
    <h5>NavBar - Form</h5>
        <Navbar>
          <NavbarHeader>
              <NavbarBrand href="#">Brand</NavbarBrand>
          </NavbarHeader>
          <Form form-left>
            <FormGroup>
              <TextInput id="search" name="search"  placeholder="search..." />
              &nbsp;&nbsp;&nbsp;
              <Button default navbar-btn >Search</Button>
            </FormGroup>
          </Form>
        </Navbar>
    <h5>NavBar - Buttons</h5>
        <Navbar>
          <NavbarHeader>
            <NavbarBrand href="#">Brand</NavbarBrand>
          </NavbarHeader>
            <Button default navbar-btn>Sign in</Button>
        </Navbar>
    <h5>NavBar - Text</h5>
        <Navbar>
          <NavbarHeader>
            <NavbarBrand href="#">Brand</NavbarBrand>
          </NavbarHeader>
            <Element navbar-text>Sign in as Atomic</Element>
        </Navbar>
    <h5>NavBar - Non-Navbar Links</h5>
        <Navbar>
          <NavbarHeader>
            <NavbarBrand href="#">Brand</NavbarBrand>
          </NavbarHeader>
            <Element navbar-text>Sign in as <NavLink href="#" navbar-link>Atomic</NavLink></Element>
        </Navbar>
    <h5>NavBar - Fixed to Top</h5>
        <Navbar top>
          <NavbarHeader>
            <NavbarBrand href="#">Navbar Fixed to Top</NavbarBrand>
          </NavbarHeader>
            <Navs data={navs_data} navbar/>
        </Navbar>
        <h5>NavBar - Fixed to Bottom</h5>
        <Navbar bottom>
          <NavbarHeader>
            <NavbarBrand href="#">Navbar Fixed to Bottom</NavbarBrand>
          </NavbarHeader>
            <Navs data={navs_data} navbar/>
        </Navbar>
        <h5>NavBar - Static Top</h5>
        <Navbar static>
          <NavbarHeader>
            <NavbarBrand href="#">Navbar Fixed to Bottom</NavbarBrand>
          </NavbarHeader>
            <Navs data={navs_data} navbar/>
        </Navbar>
    <h5>NavBar - Inverted Navbar</h5>
    <Navbar inverse>
      <NavbarHeader>
         <NavbarBrand href="#">Brand</NavbarBrand>
      </NavbarHeader>
        <Navs data={navs_data} navbar/>
    </Navbar>
    <ClearFix />
    <hr/>
    <h3>Nested Form Component</h3>
        <Table bordered>
          <THead thead_data={thead_data1}></THead>
          <HasMany data={data}></HasMany>
        </Table>
    <ClearFix />
    <hr/>
    <h3>File upload with preview</h3>
        <FilePreview></FilePreview>
        <ImageView></ImageView>
    <ClearFix />
    <hr/>
    <h3>DateRange Picker</h3>
        <DateRange></DateRange>
    <hr/>
    <h3>Navs</h3>
      <h5>Navs - Tabs</h5>
          <Navs data={navs_data} tabs/>
      <ClearFix />
      <h5>Navs - Pills</h5>
          <Navs data={navs_data} pills/>
      <ClearFix />
       <h5>Navs - Tabs Justified</h5>
          <Navs data={navs_data} tabs justified/>
       <h5>Navs - Pills Justified</h5>
          <Navs data={navs_data} pills justified/>
      <ClearFix />
       <h5>Navs - Disabled Link</h5>
          <Navs data={navs_data2} pills/>
      <ClearFix />
    <hr/>
    <h3>carousel slide</h3>
      <Carousel id="myCarousel">
          <CarouselList data={c_data}></CarouselList>
          <CarouselSlide>
            <CarouselItem active>
                <img src="https://d2eip9sf3oo6c2.cloudfront.net/series/covers/000/000/005/full/react_flux_series_banner_2.png?1404147531"/>
            </CarouselItem>
            <CarouselItem>
                <img src="https://d2eip9sf3oo6c2.cloudfront.net/series/covers/000/000/005/full/react_flux_series_banner_2.png?1404147531"/>
            </CarouselItem>
            <CarouselItem>
                <img src="https://d2eip9sf3oo6c2.cloudfront.net/series/covers/000/000/005/full/react_flux_series_banner_2.png?1404147531"/>
            </CarouselItem>
          </CarouselSlide>
          <CarouselControl_Left></CarouselControl_Left>
          <CarouselControl_Right></CarouselControl_Right>
      </Carousel>
    <hr/>
    <h3>Progress Bar</h3>
      <h5>Progress Bar - Basic Progress Bar</h5>
      <Progress>
          <ProgressBar style={{width: '60%'}}>
              <Span sr-only>60% Complete</Span>
          </ProgressBar>
      </Progress>
      <h5>Progress Bar - With Lables</h5>
      <Progress>
          <ProgressBar style={{width: '80%'}}>
              <Span>80% Complete</Span>
          </ProgressBar>
      </Progress>
    <ClearFix />
      <h5>Progress Bar - Contextual Alternatives</h5>
      <Progress>
          <ProgressBar success style={{width: '40%'}}>
              <Span sr-only>40% Complete (success)</Span>
          </ProgressBar>
      </Progress>
      <Progress>
          <ProgressBar info style={{width: '20%'}}>
              <Span sr-only>20% Complete (info)</Span>
          </ProgressBar>
      </Progress>
      <Progress>
          <ProgressBar warning style={{width: '60%'}}>
              <Span sr-only>60% Complete (warning)</Span>
          </ProgressBar>
      </Progress>
      <Progress>
          <ProgressBar danger style={{width: '80%'}}>
              <Span sr-only>80% Complete (danger)</Span>
          </ProgressBar>
      </Progress>
    <ClearFix />
      <h5>Progress Bar - Striped</h5>
      <Progress>
          <ProgressBar success striped style={{width: '40%'}}>
              <Span sr-only>40% Complete (success)</Span>
          </ProgressBar>
      </Progress>
      <Progress>
          <ProgressBar info striped style={{width: '20%'}}>
              <Span sr-only>20% Complete (info)</Span>
          </ProgressBar>
      </Progress>
      <Progress>
          <ProgressBar warning striped style={{width: '60%'}}>
              <Span sr-only>60% Complete (warning)</Span>
          </ProgressBar>
      </Progress>
      <Progress>
          <ProgressBar danger striped style={{width: '80%'}}>
              <Span sr-only>80% Complete (danger)</Span>
          </ProgressBar>
      </Progress>
    <ClearFix />
        <h5>Progress Bar - Animated</h5>
        <Progress>
            <ProgressBar striped active style={{width: '70%'}}>
                <Span sr-only>60% Complete</Span>
            </ProgressBar>
        </Progress>
    <ClearFix />
      <h5>Progress Bar - Stacked</h5>
      <Progress>
          <ProgressBar success style={{width: '45%'}}>
              <Span>Free space</Span>
          </ProgressBar>
          <ProgressBar warning striped active style={{width: '20%'}}>
              <Span>Warning</Span>
          </ProgressBar>
          <ProgressBar danger style={{width: '15%'}}>
              <Span>Danger</Span>
          </ProgressBar>
      </Progress>
    <ClearFix />
    <hr/>
    <h3>Modal Form Small</h3>
        <Button primary data-toggle="modal" data-target="#myModal_sm">Small model</Button>
        <Modal id="myModal_sm">
          <ModalDialog sm>
              <ModalHeader>
                  <Button close data-dismiss="modal">&times;</Button>
                  <ModalTitle>Modal Heading</ModalTitle>
              </ModalHeader>
              <ModalBody>
                  <p>This is a small modal.</p>
              </ModalBody>
              <ModalFooter>
                  <Button default data-dismiss="modal">Close</Button>
                  <Button primary data-dismiss="modal">Save</Button>
              </ModalFooter>
            </ModalDialog>
        </Modal>
    <ClearFix />
    <h3>Modal Form Large</h3>
        <Button primary data-toggle="modal" data-target="#myModal_lg">Large model</Button>
        <Modal id="myModal_lg">
          <ModalDialog lg>
              <ModalHeader>
                  <Button close data-dismiss="modal">&times;</Button>
                  <ModalTitle>Modal Heading</ModalTitle>
              </ModalHeader>
              <ModalBody>
                  <p>This is a large modal.</p>
              </ModalBody>
              <ModalFooter>
                  <Button default data-dismiss="modal">Close</Button>
                  <Button primary data-dismiss="modal">Save</Button>
              </ModalFooter>
            </ModalDialog>
        </Modal>
    <ClearFix />
    <hr/>
    <h3>Images</h3>
        <h5>Images - Responsive</h5>
          <Img responsive src="https://yt3.ggpht.com/-nRs8X3KQvwU/AAAAAAAAAAI/AAAAAAAAAAA/lKO16oQMGkM/s88-c-k-no/photo.jpg" ></Img>
        <ClearFix />
        <h5>Images - Shapes</h5>
          <Img rounded src="https://yt3.ggpht.com/-nRs8X3KQvwU/AAAAAAAAAAI/AAAAAAAAAAA/lKO16oQMGkM/s88-c-k-no/photo.jpg" ></Img>
          <Img circle src="https://yt3.ggpht.com/-nRs8X3KQvwU/AAAAAAAAAAI/AAAAAAAAAAA/lKO16oQMGkM/s88-c-k-no/photo.jpg" ></Img>
          <Img thumbnail src="https://yt3.ggpht.com/-nRs8X3KQvwU/AAAAAAAAAAI/AAAAAAAAAAA/lKO16oQMGkM/s88-c-k-no/photo.jpg" ></Img>
        <hr/>
    <h3>Panels</h3>
    <h5>Panel - with Heading</h5>
        <Panel default>
            <PanelHeading>Panel heading without title</PanelHeading>
            <PanelBody>Panel content</PanelBody>
        </Panel>
    <h5>Panel - with Footer</h5>
    <Panel default>
        <PanelBody>Panel content</PanelBody>
        <PanelFooter>Panel footer</PanelFooter>
    </Panel>
    <h5>Panel - Contextual alternatives</h5>
    <Panel primary>
        <PanelHeading>Panel heading</PanelHeading>
        <PanelBody>Panel content</PanelBody>
    </Panel>
    <Panel success>
        <PanelHeading>Panel heading</PanelHeading>
        <PanelBody>Panel content</PanelBody>
    </Panel>
    <Panel info>
        <PanelHeading>Panel heading</PanelHeading>
        <PanelBody>Panel content</PanelBody>
    </Panel>
    <Panel warning>
        <PanelHeading>Panel heading</PanelHeading>
        <PanelBody>Panel content</PanelBody>
    </Panel>
     <Panel danger>
        <PanelHeading>Panel heading</PanelHeading>
        <PanelBody>Panel content</PanelBody>
    </Panel>
    <h5>Panel - with List Group</h5>
    <Panel default>
        <PanelHeading>Panel Title</PanelHeading>
        <PanelBody>Some default panel content here. </PanelBody>
            <ListGroup list_data={list_data}></ListGroup>
    </Panel>
    <h5>Panel - with Tables</h5>
        <Panel default>
          <PanelHeading>Panel Title</PanelHeading>
          <PanelBody>Some default panel content here. </PanelBody>
            <Table table-responsive>
                <THead thead_data={thead_data}></THead>
                <TBody tbody_data={tbody_data}></TBody>
            </Table>
        </Panel>
    <hr/>
    <h3>Badges</h3>
        <a href="#">Inbox <Span badge>42</Span></a>
        &nbsp;&nbsp;&nbsp;
        <Button primary>Messages
          <Span badge>42</Span>
        </Button>
        <BadgeNavs data={badge_navs_data3} pills/>
    <ClearFix/>
    <hr/>
    <h3>Pop Over</h3>
    <h5>Pop Over - Top</h5>
        <PopOver info data-toggle="popover" title="Popover Header" data-content="Some content" data-placement="top">Popover on Top
        </PopOver>
    <h5>Popover - Left</h5>
        <PopOver info data-toggle="popover" title="Popover Header" data-content="Some content" data-placement="left">Popover on Left
        </PopOver>
    <h5>Pop Over - Right</h5>
        <PopOver info data-toggle="popover" title="Popover Header" data-content="Some content" data-placement="right">Popover on Right
        </PopOver>
    <h5>Pop Over - Bottom</h5>
        <PopOver info data-toggle="popover" title="Popover Header" data-content="Some content" data-placement="bottom">Popover on Bottom
        </PopOver>
    <hr/>
    <h3>Responsive Embeded Component</h3>
        <Column md-6>
          <Embed sm>
              <IFrame src="https://www.youtube.com/embed/KVZ-P-ZI6W4?list=PLb0IAmt7-GS1cbw4qonlQztYV1TAW0sCr">
              </IFrame>
          </Embed>
        </Column>
    <ClearFix />
    <h3>Table Component</h3>
        <h5>Table - striped</h5>
        <Table striped>
            <THead thead_data={thead_data}></THead>
            <TBody tbody_data={tbody_data}></TBody>
        </Table>
    <ClearFix/>
        <h5>Table - bordered</h5>
        <Table bordered>
            <THead thead_data={thead_data}></THead>
            <TBody tbody_data={tbody_data}></TBody>
        </Table>
    <ClearFix/>
        <h5>Table - hover</h5>
        <Table hover>
            <THead thead_data={thead_data}></THead>
            <TBody tbody_data={tbody_data}></TBody>
        </Table>
    <ClearFix/>
        <h5>Table - responsive</h5>
        <Table responsive>
            <THead thead_data={thead_data}></THead>
            <TBody tbody_data={tbody_data}></TBody>
        </Table>
    </Column>
    </Row>
    </Container>
    )
  }
});
ReactDOM.render(<Components />, document.getElementById("content"));