import Chip from "@material-ui/core/Chip";
import Link from "@material-ui/core/Link";
import { Twitter, YouTube } from "@material-ui/icons";
import MaterialTable from "material-table";
import React from "react";
import { Song } from "./App";

interface Props {
  songs: Song[];
}

function SongTable(props: Props) {
  return (
    <MaterialTable
      localization={{
        body: {
          emptyDataSourceMessage: (props.songs.length === 0 ? "読み込んでいます..." : "見つかりません"),
        },
        pagination: {
          labelDisplayedRows: "{from}-{to} / {count}",
          labelRowsSelect: "件ずつ",
        },
        toolbar: {
          searchTooltip: "検索",
          searchPlaceholder: "種類, 曲名, アーティスト…",
        },
      }}
      options={{
        headerStyle: { whiteSpace: 'nowrap' },
        rowStyle: { whiteSpace: 'nowrap' },
        padding: 'dense',
        pageSize: 5,
        pageSizeOptions: [5, 10, 20, 50, 100],
        showTitle: false,
      }}
      columns={[
        {
          title: '', field: 'url', render: row => {
            if (row.url.includes("twitter.com")) {
              return <div><a href={row.url}><Twitter style={{ verticalAlign: 'middle', display: 'inline-block' }} />ツイート</a></div>;
            } else {
              return <div><Link href={row.url} color="primary"><img src={row.thumbnailUrl} alt="" style={{ verticalAlign: 'middle', width: 64 }} /><YouTube style={{ verticalAlign: 'middle', display: 'inline-block' }} /></Link></div>;
            }
          }
        },
        {
          title: '種類', field: 'songType', render: row => <div>
            {
              row.songType.includes("メンバー") ? <Chip label="メンバー限定" color="primary" size="small" /> : <Chip label={row.songType} color="secondary" size="small" />
            }
            <br />
            {
              row.tag.includes("アカペラ") ? <Chip label="アカペラ" variant="outlined" color="primary" size="small" /> : ""
            }
            {
              row.tag.includes("オリジナル") ? <Chip label="オリジナル" variant="outlined" color="primary" size="small" /> : ""
            }
            {
              row.tag.includes("コラボ") ? <Chip label="コラボ" variant="outlined" color="primary" size="small" /> : ""
            }
          </div>,
        },
        { title: '曲名', field: 'originalSongTitle' },
        { title: 'アーティスト', field: 'originalArtist' },
        { title: '作詞作曲等', field: 'originalCreator' },
        { title: 'タグ', field: 'tag' },
        { title: '動画タイトル', field: 'title' },
        { title: '動画公開日', field: 'publishedAt', render: row => <div>{row.publishedAt.toLocaleString("ja")}</div> },
      ]}
      // detailPanel={row =>
      //   <iframe title={row.title} src={row.url.replace("watch?v=", "embed/").replace("&t=", "?start=")} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>}
      data={props.songs}
    />
  );
}

export default SongTable;