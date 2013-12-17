using UnityEngine;
using System.Collections;

public class Splash : MonoBehaviour
{
    public GUISkin gui_skin;

    public Texture2D[] splash_images;
    public string[] splash_texts;

    private int _index = 0;

    private Rect _rect_splash_group;
    private Rect _rect_splash_image;
    private Rect _rect_splash_text;

    private Color _color;
    private Color _color_gui;

    private float _time_start = 0f;

    private bool finished = false;

    void Start()
    {
        _rect_splash_group = new Rect((Screen.width - 512) * 0.5f, (Screen.height - 512) * 0.5f, 512, 512);
        _rect_splash_image = new Rect(128, 256, 256, 256);
        _rect_splash_text = new Rect(0, 0, 512, 256);

        _color = gui_skin.label.normal.textColor;
        _color_gui = GUI.color;

        StartCoroutine(show_splash_images());
    }

    IEnumerator show_splash_images()
    {
        for (int i = 0; i < Mathf.Max(splash_images.Length, splash_texts.Length); ++i)
        {
            _index = i;

            _color.a = 0f;
            gui_skin.label.normal.textColor = _color;

            _color_gui.a = 0f;
            GUI.color = _color_gui;
            
            _time_start = Time.time;
            while (true)
            {
                float t = (Time.time - _time_start) / 1f;
                _color.a = Mathf.Clamp(Mathf.Lerp(0f, 1f, t), 0f, 1f);
                gui_skin.label.normal.textColor = _color;

                _color_gui.a = _color.a;
                GUI.color = _color_gui;

                yield return new WaitForEndOfFrame();

                if (_color.a > 0.9f)
                    break;
            }

            _color.a = 1f;
            gui_skin.label.normal.textColor = _color;

            _color_gui.a = 1f;
            GUI.color = _color_gui;

            _time_start = Time.time;
            while (true)
            {
                float t = (Time.time - _time_start) / 4f;
                _color.a = Mathf.Clamp(Mathf.Lerp(1.5f, 0f, t), 0f, 1f);
                gui_skin.label.normal.textColor = _color;

                _color_gui.a = _color.a;
                GUI.color = _color_gui;
                                
                yield return new WaitForEndOfFrame();

                if (_color.a <= 0.01f)
                    break;
            }

            _color.a = 1f;
            gui_skin.label.normal.textColor = _color;

            _color_gui.a = 1f;
            GUI.color = _color_gui;
        }

        finished = true;
    }

    void Update()
    {
        if (finished)
        {
            Application.LoadLevel(1);
        }
    }

    void OnGUI()
    {
        if (!finished)
        {
            GUI.skin = gui_skin;
            GUI.BeginGroup(_rect_splash_group);

            if (splash_images.Length > _index)
            {
                GUI.color = _color_gui;
                GUI.DrawTexture(_rect_splash_image, splash_images[_index], ScaleMode.ScaleToFit, true);
            }

            if (splash_texts.Length > _index)
                GUI.Label(_rect_splash_text, splash_texts[_index]);

            GUI.EndGroup();
            GUI.skin = null;
        }
    }
}