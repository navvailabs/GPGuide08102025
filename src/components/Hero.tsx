import { motion } from 'framer-motion';
import { Zap, ShieldCheck, Rocket, DollarSign, CheckCircle, AlertTriangle } from 'lucide-react';
import { TextShimmer } from './ui/text-shimmer';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-primary-gradient"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 bg-success-green/10 border border-success-green/30 rounded-full px-4 py-1 mb-4">
              <div className="relative flex h-3 w-3">
                <div className="animate-pulse-green absolute inline-flex h-full w-full rounded-full bg-success-green opacity-75"></div>
                <div className="relative inline-flex rounded-full h-3 w-3 bg-success-green"></div>
              </div>
              <span className="text-sm font-medium text-success-green">Used by 500+ Australian GPs</span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-mobile-h1 md:text-desktop-h1 font-extrabold leading-tight text-white font-satoshi">
              HIGH YIELD GP <br /> <span className="text-gradient-gold">RESOURCE GUIDE</span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="mt-4 text-lg text-gray-300">
              For GPs, GP Registrars, Aspiring GPs
            </motion.p>

            <motion.p variants={itemVariants} className="mt-6 text-desktop-body max-w-xl mx-auto lg:mx-0 text-gray-300">
              Stop drowning in documentation. Generate professional care plan templates in minutes, not hours. Reclaim your time for patient care while maintaining clinical excellence.
            </motion.p>

            <motion.div variants={itemVariants} className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
              {[
                { icon: Zap, text: "Save 5+ Hours Weekly" },
                { icon: ShieldCheck, text: "No Patient Data Stored" },
                { icon: Rocket, text: "Professional Templates" },
                { icon: DollarSign, text: "Boost Practice Revenue" }
              ].map(item => (
                <div key={item.text} className="flex items-center space-x-2">
                  <item.icon className="h-5 w-5 text-success-green" />
                  <span className="text-sm text-gray-200">{item.text}</span>
                </div>
              ))}
            </motion.div>

            <motion.div variants={itemVariants} className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="w-full sm:w-auto text-medical-blue bg-premium-gold font-bold py-3 px-8 rounded-lg text-lg shadow-lg hover:scale-105 transform transition-transform duration-300 flex flex-col items-center">
                <span>Start Weekly Plan</span>
                <span className="text-sm font-normal">$14.99/week</span>
              </button>
              <button className="w-full sm:w-auto text-white border-2 border-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-white hover:text-medical-blue transform transition-all duration-300 flex flex-col items-center">
                <span>Choose Pro Plan</span>
                <span className="text-sm font-normal">$22/week</span>
              </button>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-400">
                <div className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-success-green"/>Cancel anytime, no contracts</div>
                <div className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-success-green"/>500+ active Australian GPs</div>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-8 bg-amber-500/10 border border-amber-500/30 p-3 rounded-lg text-amber-400 text-sm flex items-center space-x-2 max-w-lg mx-auto lg:mx-0">
                <AlertTriangle className="h-5 w-5 flex-shrink-0"/>
                <span>Educational templates for review. No patient data stored.</span>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="relative hidden lg:block"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="bg-medical-teal/20 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl p-1.5">
                <div className="bg-medical-blue/30 rounded-xl p-6">
                    <div className="flex justify-between items-center mb-6">
                        <span className="text-white font-bold text-lg">Template Generator</span>
                        <div className="flex space-x-2">
                            <div className="w-3.5 h-3.5 rounded-full bg-red-500"></div>
                            <div className="w-3.5 h-3.5 rounded-full bg-yellow-500"></div>
                            <div className="w-3.5 h-3.5 rounded-full bg-green-500"></div>
                        </div>
                    </div>
                    <div className="bg-medical-blue/50 p-4 rounded-lg">
                        <p className="text-gray-300 text-sm mb-2">Patient Condition:</p>
                        <div className="bg-white/10 p-3 rounded text-white font-medium">Type 2 Diabetes Mellitus</div>
                        <div className="flex justify-between items-center mt-4">
                            <span className="text-gray-300 text-sm">Process:</span>
                            <div className="flex items-center space-x-2 text-sm">
                                <span className="text-white">Input</span>
                                <span className="text-gray-500">→</span>
                                <span className="text-premium-gold font-bold">Generate</span>
                                <span className="text-gray-500">→</span>
                                <span className="text-white">Export</span>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 h-48 bg-white/5 rounded-lg flex flex-col items-center justify-center text-center p-4">
                        <TextShimmer className='font-mono text-sm [--base-color:theme(colors.gray.400)] [--base-gradient-color:theme(colors.white)]' duration={1.5}>
                            Generating template...
                        </TextShimmer>
                        <p className="text-gray-500 text-xs mt-2 animate-pulse">
                            Analyzing "Type 2 Diabetes Mellitus" input...
                        </p>
                    </div>
                </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
