function About() {

  return (
    <div className='grow overflow-y-auto'>
      <h3 className="text-3xl font-bold dark:text-white my-8 mx-6">About</h3>
      <p className="text-gray-500 dark:text-gray-400 mx-6">
        Cloud palyer is an open source online audio player. <br />
        Stack: Next.js + Flowbite + Tailwind CSS + Typescript + Howler <br />
        <a target="_blank" href="https://github.com/jackz3/nxplayer" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Source Code</a>
      </p>
    </div>
  )
}

export default About