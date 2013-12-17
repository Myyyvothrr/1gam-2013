using UnityEngine;
using System.Collections;

public class Debris : MonoBehaviour
{
    public float speed = 0.1f;

    private Color c;

    void Start()
    {
        c = renderer.material.color;
        speed = Random.Range(0.1f, 1f);
    }

    void Update()
    {
        c.a -= speed * Time.deltaTime;
        renderer.material.color = c;
        
        if (c.a <= 0)
            Destroy(gameObject);
    }
}
