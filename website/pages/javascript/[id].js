import Head from "next/head";
import Link from "next/link";
import Layout from "../../component/layout/Layout";
import { getAllPostIds, getPostData } from "../../lib/jslist";
import Editor from "../../component/editor/Editor";
import Output from "../../component/layout/Output/Output";
import hljs from "highlight.js";
import javascript from "highlight.js/lib/languages/javascript";
import { useEffect } from "react";

hljs.registerLanguage("javascript", javascript);

import {
	ArrowCircleLeftIcon,
	ArrowCircleRightIcon
} from "@heroicons/react/solid";

export async function getStaticPaths() {
	const paths = await getAllPostIds();
	return {
		paths,
		fallback: false
	};
}

export async function getStaticProps({ params }) {
	const postData = await getPostData(params.id);

	return {
		props: {
			postData
		}
	};
}
export default function Javascript({ postData }) {
	useEffect(() => {
		hljs.highlightAll();
	}, []);
	return (
		<Layout>
			<Head>
				<title>{postData.title}</title>
			</Head>
			<div className="grid grid-cols-3 h-screen">
				<div className="bg-gray-50 px-4 py-4 overflow-auto">
					<div className="py-3">
						<a
							href="#"
							className=" text-sm py-1 px-2 uppercase rounded-full border border-gray-500 tracking-wider font-medium"
						>
							Learn
						</a>
					</div>
					<div className="font-bold my-3 uppercase">
						<h1 className="text-2xl">{postData.title}</h1>
					</div>
					<div className="text-xl font-semibold mt-5 mb-3">
						{postData.subheading}
					</div>
					<div
						className="codeClass font-light js"
						dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
					/>
				</div>
				<div>
					<Editor initialValue={postData} />
				</div>
				<div>
					<Output testC={postData.testCase} />
				</div>
			</div>
			<div className="flex justify-around space-x-52 bg-gray-900 items-center py-6 sticky bottom-0 h-12">
				{postData.prev ? (
					<Link href={`/javascript/${postData.prev}`}>
						<a className="text-white">
							<ArrowCircleLeftIcon className="h-10 w-10 inline-block text-yellow-500" />
							Previous
						</a>
					</Link>
				) : (
					""
				)}
				{postData.next ? (
					<Link href={`/javascript/${postData.next}`}>
						<a className="text-white">
							Next
							<ArrowCircleRightIcon className="h-10 w-10 inline-block text-yellow-500" />
						</a>
					</Link>
				) : (
					""
				)}
			</div>
		</Layout>
	);
}
