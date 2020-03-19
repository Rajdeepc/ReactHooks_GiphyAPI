import React from 'react'

export default function GiphyItem({data}) {
    return (
        <div>
            {data.map((item) => {
                return  <iframe src={item.embed_url} title={item.id}></iframe>
            })}
           
        </div>
    )
}
