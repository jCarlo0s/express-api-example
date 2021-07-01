import app from './app';

const PORT = '9000';
app.listen(PORT, () => {
    console.log('App running');
    console.log(`On: http://localhost:${PORT}`);
});