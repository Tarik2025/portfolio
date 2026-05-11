export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 animate-fade-in">
      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 text-center mb-12">About Me</h2>
      <div className="flex flex-col lg:flex-row gap-10 items-start">
        {/* Text */}
        <div className="flex-1 space-y-5">
          <p className="text-gray-300 leading-relaxed text-[15px]">
            I am a motivated and ambitious professional with a strong academic background in Electronics and Communication Engineering.
            Currently working at <span className="text-cyan-400 font-medium">The Emmes Company, LLC</span> and actively looking for 
            <span className="text-cyan-400 font-medium"> full-time Software Development Engineer (SDE) roles</span>.
          </p>
          <p className="text-gray-300 leading-relaxed text-[15px]">
            Over time, I have gained hands-on experience in <span className="text-cyan-400 font-medium">Machine Learning, Deep Learning, and Data Analytics</span>,
            working on real-world projects like water flow analysis, resume screening, and image-to-anime conversion.
          </p>
          <p className="text-gray-300 leading-relaxed text-[15px]">
            Alongside my ML expertise, I have developed a deep interest in <span className="text-cyan-400 font-medium">MERN Stack Development</span> (MongoDB, Express.js, React, and Node.js).
            I enjoy building modern, scalable, and user-friendly web applications, integrating my knowledge of front-end and back-end development to create complete solutions.
          </p>
          <p className="text-gray-300 leading-relaxed text-[15px]">
            My core strength lies in adapting quickly to new challenges, continuously learning, and applying my technical knowledge to solve complex problems.
            I am eager to contribute to a forward-thinking organization where I can utilize my expertise in programming, full-stack development, and machine learning
            to build innovative products that make a meaningful impact.
          </p>
        </div>

        {/* Profile Card */}
        <div className="w-full lg:w-auto flex justify-center">
          <div className="bg-[#0d1f3c]/80 border border-cyan-500/15 rounded-2xl p-8 text-center w-72 shadow-xl shadow-cyan-500/5">
            <div className="relative inline-block mb-5">
              <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-xl"></div>
              <img src="/images/Profile.jpg" alt="Profile" className="relative w-32 h-32 rounded-full mx-auto object-cover border-2 border-cyan-400/50" />
            </div>
            <h5 className="text-cyan-400 font-semibold text-lg">Shaik Mahammad Tarik</h5>
            <p className="text-gray-500 text-sm mt-2 leading-relaxed">Software Developer @ Emmes<br />MERN Stack | ML Enthusiast</p>
            <p className="text-green-400 text-xs mt-2 font-medium">🟢 Open to SDE Opportunities</p>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              <span className="bg-cyan-400/10 text-cyan-300 text-[10px] px-2.5 py-1 rounded-full border border-cyan-500/20">React</span>
              <span className="bg-cyan-400/10 text-cyan-300 text-[10px] px-2.5 py-1 rounded-full border border-cyan-500/20">Node.js</span>
              <span className="bg-cyan-400/10 text-cyan-300 text-[10px] px-2.5 py-1 rounded-full border border-cyan-500/20">Python</span>
              <span className="bg-cyan-400/10 text-cyan-300 text-[10px] px-2.5 py-1 rounded-full border border-cyan-500/20">ML</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
