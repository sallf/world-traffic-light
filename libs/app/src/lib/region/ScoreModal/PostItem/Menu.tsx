export const Menu = () => {
  // --------------------- ===
  //  RENDER
  // ---------------------
  const btns = [
    {
      label: 'Edit',
      onClick: () => console.log('Edit'),
    },
    {
      label: 'Delete',
      onClick: () => console.log('Delete'),
    },
  ]
  return (
    <div className="bg-white border border-gray-200 shadow rounded p-2 flex flex-col absolute top-full mt-1 right-0 z-10">
      {btns.map((btn, i) => (
        <button
          key={i}
          onClick={btn.onClick}
          className="py-2 px-4 hover:bg-gray-100 rounded"
        >
          {btn.label}
        </button>
      ))}
    </div>
  )
}
