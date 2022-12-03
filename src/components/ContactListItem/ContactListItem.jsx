import { Button } from 'components/Form/Form.styled';

export const ContactListItem = ({ contact, deleteContact }) => {
  return (
    <li>
      <p>
        {contact.name}:{contact.number}
      </p>
      <Button type="button" onClick={() => deleteContact(contact.id)}>
        Delete
      </Button>
    </li>
  );
};
