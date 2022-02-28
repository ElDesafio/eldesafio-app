import { Button } from '@chakra-ui/react';
import { Link } from 'remix';

export default function ParticipantHealth() {
  return (
    <div>
      <h1>Participant Health</h1>
      <Link to={`edit`}>
        <Button colorScheme="blue">Edit</Button>
      </Link>
    </div>
  );
}
