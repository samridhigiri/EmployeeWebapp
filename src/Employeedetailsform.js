import React from 'react';
import { Button, Modal, ModalHeader, ModalBody , Form, div, Label, Input} from 'reactstrap';

export const Employeedetailsform = ({toggle,modal,handelChange,formData,createEmployee}) => {

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Employee Details</ModalHeader>
    <ModalBody>
    <div>
    <div>
        <Label for="name">Contact Number</Label>
        <Input type="name" name="name" id="name" placeholder="Name" value={formData.name} onChange={e => handelChange(e,'name')} />
      </div>
      <div>
        <Label for="email">Email</Label>
        <Input type="email" name="email" id="email" placeholder="Email" value={formData.email} onChange={e => handelChange(e,'email')}/>
      </div>
      <div>
        <Label for="contact">Contact Number</Label>
        <Input type="contact" name="contact" id="contact" placeholder="contact" value={formData.contact} onChange={e => handelChange(e,'contact')}/>
      </div>
      <Button onClick={createEmployee}>Submit</Button>
    </div>
    </ModalBody>
        {/* <ModalFooter>
          <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter> */}
    </Modal>
    </div>
  );
}