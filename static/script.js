const encryptionMethodSelect = document.getElementById('encryptionMethodSelect');
const inputTextArea = document.getElementById('inputTextArea');
const outputTextArea = document.getElementById('outputTextArea');
const encryptButton = document.getElementById('encryptButton');
const decryptButton = document.getElementById('decryptButton');

const encrypt = async () => {
  const encryptionMethod = encryptionMethodSelect.value;

  if (!encryptionMethod) {
    alert('Pick encryption algorithm first');
    return;
  }

  encryptButton.disabled = true;
  decryptButton.disabled = true;

  const response = await fetch(`/encrypt/${encryptionMethod.toLowerCase()}`, {
    method: 'POST',
    body: JSON.stringify({ text: inputTextArea.value }),
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await response.json();

  outputTextArea.value = data.encrypted;

  encryptButton.disabled = false;
  decryptButton.disabled = false;
};

const decrypt = async () => {
  const encryptionMethod = encryptionMethodSelect.value;

  if (!encryptionMethod) {
    alert('Pick encryption algorithm first');
    return;
  }

  encryptButton.disabled = true;
  decryptButton.disabled = true;

  const response = await fetch(`/decrypt/${encryptionMethod.toLowerCase()}`, {
    method: 'POST',
    body: JSON.stringify({ encrypted: inputTextArea.value }),
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await response.json();

  outputTextArea.value = data.decrypted;

  encryptButton.disabled = false;
  decryptButton.disabled = false;
};
 function updateAlgorithmInfo() {
        const algorithmSelect = document.getElementById('encryptionMethodSelect');
        const algorithmInfo = document.getElementById('algorithmInfo');
        const selectedAlgorithm = algorithmSelect.value;

        let infoText = '';
        
        switch (selectedAlgorithm) {
          case 'AES':
            infoText = 'AES (Advanced Encryption Standard) — це симетричний алгоритм шифрування, який широко використовується для захисту даних. Він використовує той самий ключ як для шифрування, так і для дешифрування.';
            break;
          case 'DES':
            infoText = 'DES (Data Encryption Standard) — це старий симетричний алгоритм шифрування, який раніше був широко використовуваний, але зараз вважається небезпечним через малу довжину ключа (56 біт).';
            break;
          case 'Twofish':
            infoText = 'Twofish — це симетричний алгоритм шифрування блоку з розміром блоку 128 біт і довжиною ключа до 256 біт. Він відомий своєю швидкістю і безпекою.';
            break;
          case 'Blowfish':
            infoText = 'Blowfish — це симетричний алгоритм шифрування блоку, розроблений для швидкості та безпеки. Він має змінну довжину ключа до 448 біт.';
            break;
          case 'RSA':
            infoText = 'RSA (Rivest-Shamir-Adleman) — це асиметричний алгоритм шифрування, який використовує публічний ключ для шифрування та приватний ключ для дешифрування.';
            break;
          case 'ECC':
            infoText = 'ECC (Elliptic Curve Cryptography) — це форма асиметричного шифрування, яка використовує алгебраїчну структуру еліптичних кривих над скінченними полями. Вона забезпечує високу безпеку при меншій довжині ключа.';
            break;
          default:
            infoText = '';
            break;
        }

        if (infoText) {
          algorithmInfo.style.display = 'block';
          algorithmInfo.textContent = infoText;
        } else {
          algorithmInfo.style.display = 'none';
        }
      }