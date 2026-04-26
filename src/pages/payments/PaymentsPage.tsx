import { useState } from "react";

type Transaction = {
  id: number;
  type: string;
  amount: number;
  sender: string;
  receiver: string;
  status: string;
};

export function PaymentsPage() {
  const [balance, setBalance] = useState(5000);
  const [amount, setAmount] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const addTransaction = (tx: Transaction) => {
    setTransactions([tx, ...transactions]);
  };

  const deposit = () => {
    setBalance(balance + amount);
    addTransaction({
      id: Date.now(),
      type: "Deposit",
      amount,
      sender: "Bank",
      receiver: "Wallet",
      status: "Success",
    });
  };

  const withdraw = () => {
    if (amount > balance) return alert("Insufficient balance");
    setBalance(balance - amount);
    addTransaction({
      id: Date.now(),
      type: "Withdraw",
      amount,
      sender: "Wallet",
      receiver: "Bank",
      status: "Success",
    });
  };

  const transfer = () => {
    if (amount > balance) return alert("Insufficient balance");
    setBalance(balance - amount);
    addTransaction({
      id: Date.now(),
      type: "Funding Deal",
      amount,
      sender: "Investor",
      receiver: "Entrepreneur",
      status: "Completed",
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Payments & Wallet</h1>

      {/* Wallet Balance */}
      <div className="bg-white p-4 rounded shadow w-64">
        <p className="text-gray-500">Wallet Balance</p>
        <h2 className="text-3xl font-bold">${balance}</h2>
      </div>

      {/* Actions */}
      <div className="flex gap-3 items-center">
        <input
          type="number"
          placeholder="Amount"
          className="border p-2 rounded"
          onChange={(e) => setAmount(Number(e.target.value))}
        />

        <button onClick={deposit} className="bg-green-600 text-white px-4 py-2 rounded">
          Deposit
        </button>

        <button onClick={withdraw} className="bg-red-600 text-white px-4 py-2 rounded">
          Withdraw
        </button>

        <button onClick={transfer} className="bg-blue-600 text-white px-4 py-2 rounded">
          Fund Startup
        </button>
      </div>

      {/* Transactions */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Transaction History</h2>

        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Type</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Sender</th>
              <th className="border p-2">Receiver</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>

          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center p-4">
                  No transactions yet
                </td>
              </tr>
            ) : (
              transactions.map((tx) => (
                <tr key={tx.id}>
                  <td className="border p-2">{tx.type}</td>
                  <td className="border p-2">${tx.amount}</td>
                  <td className="border p-2">{tx.sender}</td>
                  <td className="border p-2">{tx.receiver}</td>
                  <td className="border p-2 text-green-600">{tx.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}