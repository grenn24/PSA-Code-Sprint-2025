import { WBMessage } from '@common/types/wb';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

interface Prop {
    messages: WBMessage[];
    loadingWBReply: boolean
}
const WBConversationWindow = ({messages, loadingWBReply}:Prop) => {
  return (
		<>
			{messages?.map((msg, i) => (
				<div key={i}>
					{msg.role === "assistant" ? (
						<div className="w-full text-lg font-normal text-gray-800">
							<ReactMarkdown>{msg.content}</ReactMarkdown>
						</div>
					) : (
						<div className="flex justify-end">
							<div className="max-w-[75%] bg-blue-400/60 text-lg px-3 py-2 rounded-2xl rounded-br-none shadow-xs">
								{msg.content}
							</div>
						</div>
					)}
				</div>
			))}
			{loadingWBReply && (
				<div className="flex items-center gap-2 w-full mt-2 ml-2">
					{[0, 0.2, 0.4].map((delay, i) => (
						<motion.div
							key={i}
							className="w-4 h-4 bg-blue-400 rounded-full shadow-sm"
							animate={{
								opacity: [0.3, 1, 0.3],
							}}
							transition={{
								repeat: Infinity,
								duration: 0.8,
								ease: "easeInOut",
								delay,
							}}
						/>
					))}
				</div>
			)}
		</>
  );
}

export default WBConversationWindow;