import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import RotationTable from './components/RotationTable';
import RotationForm from './components/RotationForm';
import { getRotations } from './api/rotationApi';
import { Container, Button } from '@mui/material';

function App() {
  const [token, setToken] = useState('');
  const [rotations, setRotations] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    getRotations().then(res => setRotations(res.data));
  }, [reload]);

  const handleAdded = () => setReload(r => !r);

  return (
    <Container>
      {!token ? (
        <LoginForm setToken={setToken} />
      ) : (
        <>
          <Button variant="outlined" sx={{ mt: 2 }} onClick={() => setToken('')}>Вийти</Button>
          <RotationForm token={token} onAdded={handleAdded} />
        </>
      )}
      <RotationTable rotations={rotations} />
    </Container>
  );
}

export default App;