using UnityEngine;
using System.Collections;
using System.Text;

using System.Security.Cryptography;

public class Highscore
{
    const string SECRET_KEY = "X";

    const string URL_ADD = "Y";
    const string URL_GET = "Z";

    public string[] highscore_list_names = { "Fetching highscores" };
    public string[] highscore_list_scores = { "from server..." };

    public IEnumerator get()
    {
        highscore_list_names = new string[] { "Fetching highscores" };
        highscore_list_scores = new string[] { "from server..." };

        WWW request = new WWW(URL_GET);
        yield return request;

        if (!string.IsNullOrEmpty(request.error))
        {
            Debug.Log("get error: " + request.error);
            highscore_list_names = new string[] { "Failed getting" };
            highscore_list_scores = new string[] { "highscores :(" };
        }
        else
        {
            string[] a1 = request.text.Split(';');

            highscore_list_names = new string[a1.Length];
            highscore_list_scores = new string[a1.Length];

            for (int i = 0; i < a1.Length; ++i)
            {
                string[] a2 = a1[i].Split(',');

                if (a2.Length == 2)
                {
                    highscore_list_names[i] = a2[0];
                    highscore_list_scores[i] = a2[1];
                }
            }
        }
    }

    public IEnumerator post(int score, string user)
    {
        if (!string.IsNullOrEmpty(user) && score >= 0)
        {
            string secret = get_md5_hash(user + score + SECRET_KEY);

            WWWForm form = new WWWForm();
            form.AddField("name", user);
            form.AddField("score", score);
            form.AddField("secret", secret);

            WWW request = new WWW(URL_ADD, form);
            yield return request;

            if (!string.IsNullOrEmpty(request.error))
                Debug.Log("post error:" + request.error);
        }
    }

    private string get_md5_hash(string input)
    {
        byte[] input_bytes = Encoding.UTF8.GetBytes(input);

        MD5 md5 = MD5.Create();
        byte[] hash = md5.ComputeHash(input_bytes);

        StringBuilder hash_str = new StringBuilder();
        for (int i = 0; i < hash.Length; i++)
            hash_str.Append(hash[i].ToString("x2"));
        
        return hash_str.ToString();
    }
}
