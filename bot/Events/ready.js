module.exports = client => {
    console.log('READY!');
    void client.user.setActivity({ type: "PLAYING", name: "managing"})
}