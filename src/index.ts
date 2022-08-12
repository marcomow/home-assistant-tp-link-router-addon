import ArcherC6 from "./ArcherC6";

const domain = process.env.DOMAIN || 'http://192.168.0.1';
const password = process.env.PASSWORD || 'password';
const init = async () => {
    console.clear();
    const archer = new ArcherC6(
        domain,
        password,
        {}
    );

    try {
        const status = await archer.fetchStatus();
        console.log(status);
        await archer.reboot();
        console.log('Reboot command sent.');
    } catch (error) {
        console.error(error);
    }
}
init();