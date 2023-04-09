import React, { useState } from 'react';
import { post } from '../../api';
import { Image, Button } from 'antd';

interface IUploadImageResponse {
  image: string;
}

const Popup = () => {
	const [image, setImage] = useState<string>();
	const [file, setFile] = useState<File | null>(null);
	const [loading, setLoading] = useState(false);

	const getImage =async () => {
		setLoading(true);
		post('/get-image', {name: 'Lumine'}).then((res) => {
			setImage(res.src);
			setLoading(false);
		});
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files.length > 0) {
			setFile(event.target.files[0]);
		}
	};

	const handleUpload = async () => {
		setLoading(true);
		if (!file) {
			setLoading(false);
			return;
		}
		// Read the image file as a base64 string
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = async () => {
			const base64Data = reader.result?.toString().split(',')[1];
			if (!base64Data) {
				return;
			}
			// Send the base64 data to the backend
			const response: IUploadImageResponse = await post('/upload-image', {image: base64Data});
			// Handle the response from the backend
			setImage('data:image/jpeg;base64,' + response.image);
			setLoading(false);
		};
	};

	return (
		<div>
			{image ? <Image width={500} src={image}/> :
				<p>Vui lòng chọn thao tác để lấy hình</p>
			}
			<div style={{ margin: 10 }}>
				<input type='file' onChange={handleFileChange}/>
			</div>
			<div style={{display: 'flex'}}>
				<Button type='primary' danger  loading={loading} onClick={() => getImage()}>Get Image</Button>
				<Button style={{marginLeft: 5}} type='primary' loading={loading} onClick={() => handleUpload()}>Upload</Button>
			</div>
		</div>
	);
};

export default Popup;